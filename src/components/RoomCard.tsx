
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import { Room } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  room: Room;
  className?: string;
}

const RoomCard = ({ room, className }: RoomCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const occupancyPercentage = (room.occupiedCount / room.capacity) * 100;
  
  return (
    <Link 
      to={`/room/${room.id}`} 
      className={cn(
        "relative block group rounded-xl overflow-hidden border border-border card-hover bg-card",
        className
      )}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-medium">Room {room.number}</h3>
          <Badge variant={occupancyPercentage === 100 ? "destructive" : "outline"}>
            {room.occupiedCount}/{room.capacity} Occupied
          </Badge>
        </div>
        
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Floor:</span> {room.floor}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Type:</span> {room.type}
          </p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            <span className="text-sm font-medium">Students</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {room.students.map((student) => (
              <div 
                key={student.id} 
                className="flex items-center rounded-full px-3 py-1 bg-accent/50 hover:bg-accent transition-colors"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    className={cn("w-full h-full object-cover", !imageLoaded && "blur-load")}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
                <span className="text-xs">{student.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-3 right-3 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <ChevronRight className="h-5 w-5 text-primary" />
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
