"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import type { Talk, UpdateTalkRequest } from "@/domains/talks/types";
import { useUpdateTalk } from "@/domains/talks/hooks";
import { formatDateTime, secondsToDurationFields } from "@/lib/utils";
import { CalendarIcon, MapPin } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  topic: z.string().min(1, "Topic is required"),
  description: z.string().optional(),
  hours: z.coerce.number().min(0).max(10),
  minutes: z.coerce.number().min(0).max(59),
  level: z.string().min(1, "Level is required"),
});

interface UpdateTalkModalProps {
  talk: Talk;
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateTalkModal({
  talk,
  isOpen,
  onClose,
}: UpdateTalkModalProps) {
  const { mutate: updateTalk, isPending } = useUpdateTalk();
  const { hours, minutes } = secondsToDurationFields(talk.duration);

  const isPlanned = talk.status === "planned";
  const isReadOnly = isPlanned;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: talk.title,
      topic: talk.topic,
      description: talk.description,
      hours,
      minutes,
      level: talk.level,
    },
  });

  useEffect(() => {
    const { hours, minutes } = secondsToDurationFields(talk.duration);
    form.reset({
      title: talk.title,
      topic: talk.topic,
      description: talk.description,
      hours,
      minutes,
      level: talk.level,
    });
  }, [talk, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const talkRequest: UpdateTalkRequest = {
      title: values.title,
      topic: values.topic,
      description: values.description || "",
      hours: values.hours,
      minutes: values.minutes,
      level: values.level,
    };

    updateTalk(
      { id: talk.id, req: talkRequest },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isReadOnly ? "View Talk" : "Update Talk"}</DialogTitle>
        </DialogHeader>

        {isPlanned && talk.roomName && talk.startAt && (
          <div className="p-4 mb-4 border rounded-md bg-blue-50">
            <h3 className="mb-2 text-sm font-semibold text-blue-800">
              Scheduled Information
            </h3>
            <div className="flex items-center mb-2 text-sm text-blue-700">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Room: {talk.roomName}</span>
            </div>
            <div className="flex items-center text-sm text-blue-700">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <span>Starts at: {formatDateTime(talk.startAt)}</span>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter talk title"
                      {...field}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter talk topic"
                      {...field}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter talk description"
                      className="resize-none"
                      rows={3}
                      {...field}
                      disabled={isReadOnly}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={10}
                        {...field}
                        disabled={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minutes</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={59}
                        {...field}
                        disabled={isReadOnly}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isReadOnly}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                {isReadOnly ? "Close" : "Cancel"}
              </Button>
              {!isReadOnly && (
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update Talk"}
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
