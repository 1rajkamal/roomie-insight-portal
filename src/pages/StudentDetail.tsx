
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Phone, MapPin, GraduationCap, 
  Home, Calendar, Building2, Share2
} from 'lucide-react';
import { getStudentById, getRoomByNumber, rooms, students } from '@/lib/data';
import Header from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const StudentDetail = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const [student, setStudent] = useState(students.find((s) => s.id === studentId));
  const [room, setRoom] = useState(rooms.find((r) => r.students.some((s) => s.id === studentId)));
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!student) {
      navigate('/');
      return;
    }
    
    // Simulate loading for visual polish
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [student, navigate]);

  if (!student) return null;
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${student.name}'s Profile`,
        text: `Check out ${student.name}'s profile at the Hostel`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          description: "Student profile URL copied to clipboard",
          duration: 2000,
        });
      });
    }
  };
  
  const handleContactClick = (type: 'email' | 'phone') => {
    if (type === 'email') {
      window.location.href = `mailto:${student.email}`;
    } else {
      window.location.href = `tel:${student.contactNumber}`;
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container max-w-screen-lg mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Profile sidebar */}
                <div className="w-full md:w-1/3 space-y-6">
                  <div className="rounded-xl border border-border overflow-hidden glass-morphism">
                    <div className="bg-primary/10 pt-8 pb-10 px-6 text-center relative">
                      <div className="absolute top-4 right-4">
                        <Button variant="ghost" size="icon" onClick={handleShare}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="relative inline-block mb-4">
                        <Avatar className="w-24 h-24 border-4 border-background">
                          <AvatarImage 
                            src={student.photo} 
                            alt={student.name} 
                            className={!imageLoaded ? "blur-load" : ""}
                            onLoad={() => setImageLoaded(true)}
                          />
                          <AvatarFallback>
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <h1 className="text-2xl font-bold">{student.name}</h1>
                      <div className="flex items-center justify-center space-x-2 mt-1">
                        <Badge>{student.gender}</Badge>
                        <Badge variant="outline">{student.age} years</Badge>
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <button 
                            className="font-medium hover:text-primary transition-colors"
                            onClick={() => handleContactClick('email')}
                          >
                            {student.email}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <button 
                            className="font-medium hover:text-primary transition-colors"
                            onClick={() => handleContactClick('phone')}
                          >
                            {student.contactNumber}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Home className="h-5 w-5 text-primary mr-3" />
                        <div>
                          <p className="text-sm text-muted-foreground">Hometown</p>
                          <p className="font-medium">{student.hometown}</p>
                        </div>
                      </div>
                      
                      {room && (
                        <div className="flex items-center">
                          <Building2 className="h-5 w-5 text-primary mr-3" />
                          <div>
                            <p className="text-sm text-muted-foreground">Residing in</p>
                            <Link 
                              to={`/room/${room.id}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              Room {room.number}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Details content */}
                <div className="w-full md:w-2/3 space-y-6">
                  <div className="rounded-xl border border-border p-6 glass-morphism">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-primary" />
                      Academic Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                      <div>
                        <p className="text-sm text-muted-foreground">College</p>
                        <p className="font-medium text-lg">{student.college}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Branch</p>
                        <p className="font-medium text-lg">{student.branch}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-muted-foreground">Year of Study</p>
                        <p className="font-medium text-lg">{student.year}{getOrdinalSuffix(student.year)} Year</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl border border-border p-6 glass-morphism">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      Additional Information
                    </h2>
                    
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground">
                        {student.name} is a {getOrdinalSuffix(student.year)} year student in the {student.branch} department at {student.college}. 
                        {student.gender === 'Male' ? 'He' : 'She'} is from {student.hometown} and is currently {student.age} years old.
                      </p>
                      
                      {room && (
                        <p className="text-muted-foreground mt-4">
                          Currently residing in Room {room.number} on Floor {room.floor}, which is a {room.type} room
                          with {room.occupiedCount} out of {room.capacity} beds occupied.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

const getOrdinalSuffix = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  
  if (j === 1 && k !== 11) {
    return num + "st";
  }
  if (j === 2 && k !== 12) {
    return num + "nd";
  }
  if (j === 3 && k !== 13) {
    return num + "rd";
  }
  return num + "th";
};

export default StudentDetail;
