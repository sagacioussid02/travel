import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ItineraryItem } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { ChevronDown } from 'lucide-react';

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
          <TableHead>Optional Spots</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {itinerary.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.day}</TableCell>
            <TableCell>{item.time}</TableCell>
            <TableCell>{item.spot}</TableCell>
            <TableCell>{item.thingsToDo}</TableCell>
            <TableCell>
              {item.optionalSpots && item.optionalSpots.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      View Options <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.optionalSpots.map((spot, i) => (
                      <DropdownMenuItem key={i} className="flex flex-col items-start gap-1">
                         <p className="font-semibold">{spot.spot}</p>
                         <p className="text-xs text-muted-foreground">{spot.description}</p>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                'N/A'
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
