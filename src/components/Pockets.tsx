"use client";

import React from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader as DialogHeaderUI,
  DialogTitle as DialogTitleUI,
  DialogFooter as DialogFooterUI,
  DialogClose,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";

type Pocket = {
  _id: string;
  label: string;
  description?: string;
  target?: number;
  value: number;
  userIds: Id<"users">[];
  createdBy: Id<"users">;
};

const Pockets = ({ userIds }: { userIds: Id<"users">[] }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const createPocket = useMutation(api.pockets.createPocket);
  const form = useForm<CreatePocketFormValues>();
  const pockets = useQuery(api.pockets.getPocketsForUsers, { userIds }) as
    | Pocket[]
    | undefined;

  if (pockets === undefined) return <div>Loading pockets...</div>;

  return (
    <section className="grid gap-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Pockets</h2>
        <CreatePocketDialog
          open={dialogOpen}
          setOpen={setDialogOpen}
          onSubmit={async (data) => {
            await createPocket({
              ...data,
              target: data.target ? Number(data.target) : undefined,
              value: data.value ? Number(data.value) : undefined,
              userIds,
            });
            form.reset();
          }}
          form={form}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <PocketList pockets={pockets} />
      </div>
      {pockets.length === 0 && <div>No pockets found.</div>}
    </section>
  );
};

type CreatePocketFormValues = {
  label: string;
  description?: string;
  target?: number;
  value?: number;
};

type CreatePocketDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: CreatePocketFormValues) => Promise<void>;
  form: ReturnType<typeof useForm<CreatePocketFormValues>>;
};

const CreatePocketDialog = ({
  open,
  setOpen,
  onSubmit,
  form,
}: CreatePocketDialogProps) => (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="default" type="button">
        Create Pocket
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeaderUI>
        <DialogTitleUI>Create a new Pocket</DialogTitleUI>
      </DialogHeaderUI>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          await onSubmit(data);
          setOpen(false);
        })}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="label">Label</Label>
          <Input id="label" {...form.register("label", { required: true })} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Input id="description" {...form.register("description")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="target">Target</Label>
          <Input id="target" type="number" {...form.register("target")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="value">Value</Label>
          <Input id="value" type="number" {...form.register("value")} />
        </div>
        <DialogFooterUI>
          <Button type="submit">Create</Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooterUI>
      </form>
    </DialogContent>
  </Dialog>
);

type PocketListProps = { pockets: Pocket[] };
const PocketList = ({ pockets }: PocketListProps) => {
  const [openPocketId, setOpenPocketId] = React.useState<string | null>(null);
  return (
    <>
      {pockets.map((pocket) => (
        <Card key={pocket._id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{pocket.label}</CardTitle>
            <span className="font-mono text-base">{pocket.value}</span>
          </CardHeader>
          <CardContent className="flex justify-end">
            <Button
              variant="secondary"
              onClick={() => setOpenPocketId(pocket._id)}
            >
              View / Update
            </Button>
            <PocketDialog
              pocket={pocket}
              open={openPocketId === pocket._id}
              setOpen={(open) => setOpenPocketId(open ? pocket._id : null)}
            />
          </CardContent>
        </Card>
      ))}
    </>
  );
};

type PocketDialogProps = {
  pocket: Pocket;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const PocketDialog = ({ pocket, open, setOpen }: PocketDialogProps) => {
  const form = useForm<{
    label: string;
    description?: string;
    target?: number;
    value?: number;
  }>({
    defaultValues: {
      label: pocket.label,
      description: pocket.description,
      target: pocket.target,
      value: pocket.value,
    },
  });
  const updatePocket = useMutation(api.pockets.updatePocket);
  const deletePocket = useMutation(api.pockets.deletePocket);
  const [loading, setLoading] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const onSubmit = async (data: {
    label: string;
    description?: string;
    target?: number;
    value?: number;
  }) => {
    setLoading(true);
    await updatePocket({
      pocketId: pocket._id as Id<"pockets">,
      update: {
        label: data.label,
        description: data.description,
        target: data.target ? Number(data.target) : undefined,
        value: data.value ? Number(data.value) : undefined,
      },
    });
    setLoading(false);
    setOpen(false);
  };

  const onDelete = async () => {
    setDeleting(true);
    await deletePocket({ pocketId: pocket._id as Id<"pockets"> });
    setDeleting(false);
    setOpen(false);
    setConfirmOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      form.reset({
        label: pocket.label,
        description: pocket.description,
        target: pocket.target,
        value: pocket.value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pocket]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeaderUI>
          <DialogTitleUI>View / Update Pocket</DialogTitleUI>
        </DialogHeaderUI>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="label">Label</Label>
            <Input id="label" {...form.register("label", { required: true })} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...form.register("description")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="target">Target</Label>
            <Input id="target" type="number" {...form.register("target")} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="value">Value</Label>
            <Input id="value" type="number" {...form.register("value")} />
          </div>
          <DialogFooterUI>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" disabled={deleting}>
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Pocket?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this pocket? This action
                    cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleting}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      disabled={deleting}
                      onClick={onDelete}
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                disabled={loading || deleting}
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooterUI>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Pockets;
