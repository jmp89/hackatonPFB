import React, { useState, useEffect } from "react";
import fetchThematicsService from "../services/fetchThematicsService";
import fetchTechnologiesService from "../services/fetchTechnologiesService";
import { useMediaQuery} from "react-responsive";

const ListTechnologiesAndThematicsComponent = () => {
  const [thematics, setThematics] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [currentThematicsIndex, setCurrentThematicsIndex] = useState(0);
  const [currentTechnologiesIndex, setCurrentTechnologiesIndex] = useState(0);

  useEffect(() => {
    const fetchThematics = async () => {
      try {
        const thematicsData = await fetchThematicsService();
        setThematics(thematicsData);
      } catch (error) {
        console.error("Error fetching thematics:", error);
      }
    };

    const fetchTechnologies = async () => {
      try {
        const technologiesData = await fetchTechnologiesService();
        setTechnologies(technologiesData);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      }
    };

    fetchThematics();
    fetchTechnologies();
  }, []);

  const handleThematicsNext = () => {
    setCurrentThematicsIndex((prevIndex) =>
      prevIndex + 3 >= thematics.length ? 0 : prevIndex + 3
    );
  };

  const handleTechnologiesNext = () => {
    setCurrentTechnologiesIndex((prevIndex) =>
      prevIndex + 3 >= technologies.length ? 0 : prevIndex + 3
    );
  };


  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const renderThematics = () => {
  const start = currentThematicsIndex;
  const itemsPerRow = isMobile ? 3 : 4;
    const end = start + itemsPerRow;
  return thematics.slice(start, end).map((them, index) => (
    <div key={index} className="rounded-lg border-2 border-border p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold">{them}</h3>

    </div>
    ));
  };

  const renderTechnologies = () => {
    const start = currentTechnologiesIndex;
    const itemsPerRow = isMobile ? 3 : 4;
    const end = start + itemsPerRow;
    return technologies.slice(start, end).map((tech, index) => (
      <div key={index} className="rounded-lg border-2  p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
        <h3 className="text-xl font-semibold">{tech}</h3>
      </div>
    ));
  };

 
  return (
    <main className="text-center">
      <section className="py-12 md:py-16 h-auto lg:py-20 bg-zinc-800 text-white mt-10">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl tracking-tight sm:text-5xl md:text-6xl">
            Tecnologías y Temáticas Relevantes
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg leading-relaxed">
            Explora las principales tecnologías y temáticas que impulsan el desarrollo web y la innovación.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight">Tecnologías Clave</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {renderTechnologies()}
          </div>
          <div className="mt-4">
            <button
              className="bg-primary text-primary-foreground p-2 rounded w-44 bg-black text-white py-2  font-bold text-lg mb-2 hover:scale-105 transition-transform duration-300"
              onClick={handleTechnologiesNext}
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 bg-zinc-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight">Temáticas Relevantes</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {renderThematics()}
          </div>
          <div className="mt-4">
            <button
             className="bg-primary text-primary-foreground p-2 rounded w-44 bg-black text-white py-2  font-bold text-lg mb-2 hover:scale-105 transition-transform duration-300"
              onClick={handleThematicsNext}
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ListTechnologiesAndThematicsComponent;
