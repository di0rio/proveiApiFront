import React from "react";
import { Clock, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-amber-100 fixed bottom-0 w-full mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <p className="m-0">Segunda a Domingo, das 6h às 20h</p>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            <p className="m-0">Rua da Padaria, 123 - Centro</p>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={18} />
            <p className="m-0">(11) 9999-9999</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
