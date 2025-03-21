
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { rooms, getRoomByNumber } from '@/lib/data';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchBar = ({ 
  className, 
  onSearch, 
  placeholder = "Search room number...", 
  autoFocus = false 
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [roomSuggestions, setRoomSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (query.length > 0) {
      const filteredRooms = rooms
        .filter(room => room.number.toLowerCase().includes(query.toLowerCase()))
        .map(room => room.number);
      setRoomSuggestions(filteredRooms.slice(0, 5));
    } else {
      setRoomSuggestions([]);
    }
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        const room = getRoomByNumber(query);
        if (room) {
          navigate(`/room/${room.id}`);
        } else {
          navigate(`/search?q=${encodeURIComponent(query)}`);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (roomNumber: string) => {
    const room = getRoomByNumber(roomNumber);
    if (room) {
      navigate(`/room/${room.id}`);
    }
    setRoomSuggestions([]);
  };

  const clearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={cn("relative w-full max-w-xl mx-auto", className)}>
      <div 
        className={cn(
          "flex items-center relative backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border border-border rounded-full transition-all duration-300",
          isFocused ? "ring-2 ring-primary/30 shadow-soft" : "hover:border-primary/50"
        )}
      >
        <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
        
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent py-3 pl-11 pr-4 w-full focus:outline-none rounded-full"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
        />
        
        {query && (
          <button
            className="absolute right-16 p-1 rounded-full hover:bg-accent/50 transition-colors"
            onClick={clearSearch}
            type="button"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        
        <Button 
          onClick={handleSearch} 
          className="absolute right-1.5 rounded-full h-9 px-4"
          type="button"
          variant="default"
        >
          Search
        </Button>
      </div>

      {/* Suggestions dropdown */}
      {roomSuggestions.length > 0 && isFocused && (
        <div className="absolute mt-1 w-full z-10 rounded-lg border border-border glass-morphism shadow-md animate-fade-in overflow-hidden">
          <ul className="py-2">
            {roomSuggestions.map((roomNumber) => (
              <li key={roomNumber}>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-accent/50 transition-colors"
                  onClick={() => handleSuggestionClick(roomNumber)}
                  type="button"
                >
                  Room {roomNumber}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
