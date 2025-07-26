import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ItineraryItem } from '@/lib/types';

interface ItineraryTableProps {
  itinerary: ItineraryItem[];
}

export function ItineraryTable({ itinerary }: ItineraryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Day</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Spot</TableHead>
          <TableHead>Things to Do</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itinerary.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.day}</TableCell>
            <TableCell>{item.timeOfDay}</TableCell>
            <TableCell>{item.spot}</TableCell>
            <TableCell>{item.thingsToDo}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
