
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import RoomCard from '@/components/RoomCard';
import { rooms } from '@/lib/data';

const Index = () => {
  const [displayRooms, setDisplayRooms] = useState(rooms.slice(0, 6));
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading state for visual polish
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20 px-4">
        <section className="container max-w-screen-xl mx-auto mb-20">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-primary/10">
              <Building2 className="h-6 w-6 text-primary mr-2" />
              <span className="text-primary font-medium">Hostel Management</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Find Student Details by Room Number
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Quickly access information about room occupancy and student profiles in your hostel
            </p>
            
            <SearchBar className="max-w-2xl mx-auto" autoFocus />
          </motion.div>
        </section>
        
        <section className="container max-w-screen-xl mx-auto">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold">Hostel Rooms</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {displayRooms.map((room) => (
              <motion.div key={room.id} variants={itemVariants}>
                <RoomCard room={room} />
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t border-border">
        <div className="container max-w-screen-xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HostelView. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
