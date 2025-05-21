import { FC, useEffect, useState } from 'react';
import { useAPI } from '@/hooks/use-api';
import type { Profile } from '@/types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DatePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";

const activitySchema = z.object({
  handle: z.string().min(1, "Handle is required"),
  type: z.enum(["TWEET", "RETWEET", "REPLY"], {
    required_error: "Please select an activity type",
  }),
  timestamp: z.string().optional(),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

const Profiles: FC = () => {
  const { getProfiles, submitActivity, loading, error } = useAPI();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [useTimestamp, setUseTimestamp] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [hours, setHours] = useState<string>('00');
  const [minutes, setMinutes] = useState<string>('00');

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      handle: "",
      type: "TWEET",
      timestamp: undefined,
    },
  });

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await getProfiles();
      if (response.data) {
        setProfiles(response.data);
      }
    };
    fetchProfiles();
  }, []);

  const handleTimestampToggle = (checked: boolean) => {
    setUseTimestamp(checked);
    if (checked) {
      const now = new Date();
      setSelectedDate(now);
      setHours(now.getHours().toString().padStart(2, '0'));
      setMinutes(now.getMinutes().toString().padStart(2, '0'));
      updateTimestamp(now, now.getHours(), now.getMinutes());
    } else {
      setSelectedDate(undefined);
      setHours('00');
      setMinutes('00');
      form.setValue('timestamp', undefined);
    }
  };

  const updateTimestamp = (date: Date, hours: number, minutes: number) => {
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    form.setValue('timestamp', newDate.toISOString());
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      updateTimestamp(date, parseInt(hours), parseInt(minutes));
    }
  };

  const handleTimeChange = (type: 'hours' | 'minutes', value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    if (type === 'hours' && numValue >= 0 && numValue <= 23) {
      setHours(value.padStart(2, '0'));
      if (selectedDate) {
        updateTimestamp(selectedDate, numValue, parseInt(minutes));
      }
    } else if (type === 'minutes' && numValue >= 0 && numValue <= 59) {
      setMinutes(value.padStart(2, '0'));
      if (selectedDate) {
        updateTimestamp(selectedDate, parseInt(hours), numValue);
      }
    }
  };

  const onSubmit = async (data: ActivityFormValues) => {
    try {
      const formattedData = {
        ...data,
        timestamp: useTimestamp ? new Date(data.timestamp || new Date()).toISOString() : undefined,
      };
      
      const response = await submitActivity(formattedData);
      if (response.error) {
        toast.error(response.error);
      } else {
        toast.success("Activity submitted successfully");
        setIsDialogOpen(false);
        form.reset();
        setUseTimestamp(false);
        setSelectedDate(undefined);
        setHours('00');
        setMinutes('00');
        // Refresh profiles
        const profilesResponse = await getProfiles();
        if (profilesResponse.data) {
          setProfiles(profilesResponse.data);
        }
      }
    } catch (err) {
      toast.error("Failed to submit activity");
    }
  };

  return (
    <div className="w-full h-full p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profiles</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all profiles in the system. Monitor their activity status and recent updates.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Submit Activity</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit New Activity</DialogTitle>
              <DialogDescription>
                Add a new activity for a profile. This will update their activity status and count.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="handle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Handle</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter profile handle" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TWEET">Tweet</SelectItem>
                          <SelectItem value="RETWEET">Retweet</SelectItem>
                          <SelectItem value="REPLY">Reply</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-timestamp"
                    checked={useTimestamp}
                    onCheckedChange={handleTimestampToggle}
                  />
                  <FormLabel htmlFor="use-timestamp">Use Custom Timestamp</FormLabel>
                </div>
                {useTimestamp && (
                  <div className="space-y-4">
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <DatePicker date={selectedDate} onSelect={handleDateSelect} />
                    </FormItem>
                    <div className="flex space-x-4">
                      <FormItem className="flex-1">
                        <FormLabel>Hours (0-23)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="23"
                            value={hours}
                            onChange={(e) => handleTimeChange('hours', e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex-1">
                        <FormLabel>Minutes (0-59)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="0"
                            max="59"
                            value={minutes}
                            onChange={(e) => handleTimeChange('minutes', e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg p-6">
        {loading ? (
          <div className="text-center py-4">Loading profiles...</div>
        ) : error ? (
          <div className="text-destructive text-center py-4">{error}</div>
        ) : (
          <Table>
            <TableCaption>A list of all profiles in the system.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Handle</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
                <TableHead className="w-[200px]">Activity Count</TableHead>
                <TableHead className="w-[400px]">Last Activity</TableHead>
                {/* <TableHead>Created At</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.handle}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      profile.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {profile.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{profile.activityCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {format(new Date(profile.lastActivityAt), 'MMM d, yyyy')}  {format(new Date(profile.lastActivityAt), 'h:mm a')}
                      </span>
         
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(profile.lastActivityAt), { addSuffix: true })}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Profiles; 