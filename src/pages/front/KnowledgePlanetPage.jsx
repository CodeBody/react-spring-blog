import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBlog } from '../../context/BlogContext';
import KnowledgePlanet from '../../components/common/KnowledgePlanet';

export default function KnowledgePlanetPage() {
  const { categories, fetchCategories } = useBlog();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Immersive 3D Galaxy Canvas */}
      <div className="absolute inset-0 z-0">
         <KnowledgePlanet categories={categories} />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 border-t border-r border-white/5 pointer-events-none transition-opacity duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 border-b border-l border-white/5 pointer-events-none transition-opacity duration-1000"></div>
    </div>
  );
}
