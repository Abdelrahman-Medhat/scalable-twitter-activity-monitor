import { FC, useEffect, useState } from 'react';
import { useAPI } from '@/hooks/use-api';
import type { Alert } from '@/types';
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

const Alerts: FC = () => {
  const { getAlerts, loading, error } = useAPI();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      const response = await getAlerts();
      if (response.data) {
        setAlerts(response.data);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="w-full h-full p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground mt-2">
          A list of profiles that have been inactive for more than 30 minutes
          </p>
        </div>
      </div>

      <div className="bg-card rounded-lg p-6">
        {loading ? (
          <div className="text-center py-4">Loading alerts...</div>
        ) : error ? (
          <div className="text-destructive text-center py-4">{error}</div>
        ) : (
          <Table>
            <TableCaption>A list of all alerts in the system.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Handle</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
                <TableHead className="w-[200px]">Activity Count</TableHead>
                <TableHead className="w-[400px]">Last Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium">{alert.handle}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      alert.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {alert.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>{alert.activityCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {format(new Date(alert.lastActivityAt), 'MMM d, yyyy')}  {format(new Date(alert.lastActivityAt), 'h:mm a')}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(alert.lastActivityAt), { addSuffix: true })}
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

export default Alerts; 