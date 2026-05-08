import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SkillCard from "../components/ui/SkillCard";

export default function RubikSkillsCarousel(){
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)


    // Logica de navegacion con las

}