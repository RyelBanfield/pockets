"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { Button } from "./ui/button";

interface PartnerConnectionProps {
  userId: Id<"users">;
}

export const PartnerConnection = ({ userId }: PartnerConnectionProps) => {
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [redeemStatus, setRedeemStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [redeemError, setRedeemError] = useState("");

  // Fetch connection status
  const connection = useQuery(api.couples.findByUserId, { userId });
  const inviteCode = useQuery(api.inviteCodes.getActiveInviteCode, { userId });
  const generateInviteCode = useMutation(
    api.inviteCodes.generateInviteCodeForUser,
  );
  const redeemInviteCode = useMutation(api.inviteCodes.redeemInviteCode);

  const handleGenerate = async () => {
    if (connection) return;
    await generateInviteCode({ userId });
  };

  const handleCopy = () => {
    if (inviteCode?.code) {
      navigator.clipboard.writeText(inviteCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemStatus("idle");
    setRedeemError("");
    if (connection) {
      setRedeemStatus("error");
      setRedeemError("You are already connected to a partner.");
      return;
    }
    if (
      inviteCode?.code &&
      inputCode.trim().toUpperCase() === inviteCode.code.trim().toUpperCase()
    ) {
      setRedeemStatus("error");
      setRedeemError("You cannot connect with your own code.");
      return;
    }
    try {
      await redeemInviteCode({
        code: inputCode.trim().toUpperCase(),
        userId,
      });
      setRedeemStatus("success");
      setInputCode("");
    } catch (err) {
      let errorMsg =
        err && typeof err === "object" && "message" in err
          ? (err as { message?: string }).message
          : undefined;

      // Map known Convex errors to user-friendly messages
      if (errorMsg) {
        if (errorMsg.includes("Invalid or already used invite code")) {
          errorMsg = "That code is invalid or has already been used.";
        } else if (
          errorMsg.includes("Failed to generate a unique invite code")
        ) {
          errorMsg = "Could not generate a code. Please try again.";
        } else if (errorMsg.toLowerCase().includes("network")) {
          errorMsg = "Network error. Please try again.";
        }
      }
      setRedeemStatus("error");
      setRedeemError(errorMsg || "Failed to redeem code. Please try again.");
    }
  };

  return (
    <section
      className="flex w-full flex-col gap-8 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
      aria-label="Partner Connection"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Share Invite Code */}
        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-tight text-gray-900">
            Share your invite code
          </h2>
          {connection ? (
            <div className="rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-700">
              You are already connected to a partner.
            </div>
          ) : inviteCode && inviteCode.code ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="w-full flex-1 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-center font-mono text-lg tracking-widest text-gray-900 select-all sm:w-auto">
                {inviteCode.code}
              </span>
              <Button
                onClick={handleCopy}
                size="sm"
                className="w-full min-w-[88px] focus-visible:ring-2 focus-visible:ring-blue-400 sm:w-auto"
                aria-label="Copy invite code"
                disabled={!!connection}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleGenerate}
              size="sm"
              className="mt-1 w-full focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Generate invite code"
              disabled={!!connection}
            >
              Generate Invite Code
            </Button>
          )}
          <p className="mt-3 text-xs text-gray-500">
            Share this code with your partner to connect your accounts.
          </p>
        </div>
        {/* Redeem Partner Code */}
        <div>
          <h2 className="mb-3 text-lg font-semibold tracking-tight text-gray-900">
            Enter partner&apos;s code
          </h2>
          <form
            onSubmit={handleRedeem}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            aria-label="Redeem partner code"
          >
            <input
              id="invite-code"
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="ABC123"
              className="w-full flex-1 rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-center font-mono text-lg tracking-widest text-gray-900 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 sm:w-auto"
              maxLength={6}
              required
              style={{ textTransform: "uppercase" }}
              autoComplete="off"
              autoCapitalize="characters"
              aria-label="Enter partner's invite code"
              disabled={!!connection}
            />
            <Button
              type="submit"
              size="sm"
              className="w-full min-w-[120px] focus-visible:ring-2 focus-visible:ring-blue-400 sm:w-auto"
              disabled={inputCode.length !== 6 || !!connection}
              aria-label="Connect accounts"
            >
              Connect
            </Button>
          </form>
          {redeemStatus === "success" && (
            <div className="mt-3 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
              Connected! 🎉
            </div>
          )}
          {redeemStatus === "error" && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {redeemError || "Connection failed. Please try again."}
            </div>
          )}
          <p className="mt-3 text-xs text-gray-500">
            Enter the 6-character code your partner shared with you.
          </p>
        </div>
      </div>
    </section>
  );
};
