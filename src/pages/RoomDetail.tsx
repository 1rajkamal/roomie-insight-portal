
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Users, Calendar, Building, Share2, Clipboard
} from 'lucide-react';
import { getRoomByNumber, rooms } from '@/lib/data';
import Header from '@/components/Header';
import StudentCard from '@/components/StudentCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RoomDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState(rooms.find((r) => r.id === roomId));
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!room) {
      navigate('/');
      return;
    }
    
    // Simulate loading for visual polish
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [room, navigate]);

  if (!room) return null;
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Room ${room.number} Details`,
        text: `Check out Room ${room.number} at the Hostel`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          description: "Room URL copied to clipboard",
          duration: 2000,
        });
      });
    }
  };
  
  const handleCopyRoomNumber = () => {
    navigator.clipboard.writeText(room.number).then(() => {
      toast({
        description: "Room number copied to clipboard",
        duration: 2000,
      });
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-screen-lg mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <AnimatePresence>
              {isLoaded && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h1 className="text-3xl font-bold">Room {room.number}</h1>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={handleCopyRoomNumber}
                          className="h-8 w-8"
                        >
                          <Clipboard className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Building className="h-4 w-4" />
                        <span>Floor {room.floor}</span>
                        <span>•</span>
                        <span>{room.type} Room</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 flex items-center space-x-2">
                      <Badge variant={room.occupiedCount === room.capacity ? "destructive" : "outline"} className="text-sm">
                        {room.occupiedCount}/{room.capacity} Occupied
                      </Badge>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="space-y-4"
                  >
                    <TabsList className="grid w-full max-w-xs grid-cols-2">
                      <TabsTrigger value="details">
                        <Calendar className="h-4 w-4 mr-2" />
                        Details
                      </TabsTrigger>
                      <TabsTrigger value="students">
                        <Users className="h-4 w-4 mr-2" />
                        Students
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="details" className="space-y-4">
                      <div className="p-6 rounded-xl border border-border glass-morphism animate-fade-in">
                        <h2 className="text-xl font-semibold mb-4">Room Information</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <InfoItem label="Room Number" value={room.number} />
                            <InfoItem label="Floor" value={room.floor.toString()} />
                            <InfoItem label="Room Type" value={room.type} />
                          </div>
                          
                          <div className="space-y-4">
                            <InfoItem label="Capacity" value={`${room.capacity} Students`} />
                            <InfoItem label="Occupancy Status" value={`${room.occupiedCount}/${room.capacity} Occupied`} />
                            <InfoItem label="Available Beds" value={`${room.capacity - room.occupiedCount}`} />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="students" className="space-y-6 animate-fade-in">
                      <div className="grid grid-cols-1 gap-6">
                        {room.students.map((student) => (
                          <StudentCard 
                            key={student.id} 
                            student={student} 
                            detailed 
                          />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default RoomDetail;
