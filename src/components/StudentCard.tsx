
import { Link } from 'react-router-dom';
import { GraduationCap, MapPin, Mail, Phone, ChevronRight, User } from 'lucide-react';
import { Student } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StudentCardProps {
  student: Student;
  className?: string;
  detailed?: boolean;
}

const StudentCard = ({ student, className, detailed = false }: StudentCardProps) => {
  return (
    <Link 
      to={`/student/${student.id}`} 
      className={cn(
        "relative block group rounded-xl overflow-hidden border border-border card-hover bg-card",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row">
        <div className={cn(
          "relative overflow-hidden bg-muted flex items-center justify-center",
          detailed ? "lg:w-1/3 h-64 lg:h-auto" : "h-40"
        )}>
          <User className="h-20 w-20 text-muted-foreground" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className={cn(
          "p-5",
          detailed ? "lg:w-2/3" : ""
        )}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium">{student.name}</h3>
            <Badge>{student.gender}</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <GraduationCap className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{student.college}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span className="text-sm">{student.branch}, Year {student.year}</span>
            </div>
            
            {detailed && (
              <>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">{student.email}</span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">{student.contactNumber}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm">Hometown: {student.hometown}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="absolute bottom-3 right-3 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <ChevronRight className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StudentCard;
