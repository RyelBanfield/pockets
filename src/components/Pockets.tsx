"use client";

import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const Pockets = ({ userIds }: { userIds: Id<"users">[] }) => {
  const pockets = useQuery(api.pockets.getPocketsForUsers, { userIds }) || [];
  const createPocket = useMutation(api.pockets.createPocket);
  const updatePocket = useMutation(api.pockets.updatePocket);
  const deletePocket = useMutation(api.pockets.deletePocket);

  // Form state for new pocket
  const [form, setForm] = useState({
    label: "",
    description: "",
    target: "",
    value: "",
  });
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPocket({
      label: form.label,
      description: form.description || undefined,
      target: form.target ? Number(form.target) : undefined,
      value: form.value ? Number(form.value) : 0,
      userIds,
    });
    setForm({ label: "", description: "", target: "", value: "" });
    setCreating(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Pockets</h2>
        <Button onClick={() => setCreating((v) => !v)}>
          {creating ? "Cancel" : "Add Pocket"}
        </Button>
      </div>
      {creating && (
        <form
          onSubmit={handleCreate}
          className="flex flex-col gap-2 rounded-md bg-gray-50 p-4"
        >
          <Label>Label</Label>
          <Input
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            required
          />
          <Label>Description</Label>
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />
          <Label>Target (optional)</Label>
          <Input
            type="number"
            value={form.target}
            onChange={(e) => setForm((f) => ({ ...f, target: e.target.value }))}
            min={0}
          />
          <Label>Current Value</Label>
          <Input
            type="number"
            value={form.value}
            onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
            min={0}
            required
          />
          <Button type="submit">Create</Button>
        </form>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pockets?.map((pocket) => (
          <Card key={pocket._id} className="flex flex-col gap-2 p-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{pocket.label}</div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deletePocket({ pocketId: pocket._id })}
              >
                Delete
              </Button>
            </div>
            <div className="text-gray-600">{pocket.description}</div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Current:</span>
              <Input
                type="number"
                className="w-24"
                value={pocket.value}
                onChange={async (e) => {
                  await updatePocket({
                    pocketId: pocket._id,
                    update: { value: Number(e.target.value) },
                  });
                }}
                min={0}
              />
              {pocket.target && (
                <span className="ml-2 text-gray-500">/ {pocket.target}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
      {pockets && pockets.length === 0 && (
        <div className="text-gray-500">
          No pockets yet. Create one to get started!
        </div>
      )}
    </div>
  );
};
