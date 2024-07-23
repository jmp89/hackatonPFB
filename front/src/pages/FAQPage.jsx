
const FAQPage = () => {
    const faqs = [
        {
            question: "¿Qué es un hackathon?",
            answer: "Un hackathon es un evento donde los participantes colaboran en equipos para desarrollar soluciones innovadoras a problemas específicos en un período de tiempo limitado, generalmente entre 24 y 48 horas."
        },
        {
            question: "¿Cómo puedo crear un hackathon en HackaVerse?",
            answer: "Para crear un hackathon, simplemente inicia sesión en tu cuenta de HackaVerse, ve a la sección 'Crear Hackathon' en el panel de usuario y sigue los pasos para configurar los detalles del evento, como la fecha, la temática y las reglas."
        },
        {
            question: "¿Cómo me registro para participar en un hackathon?",
            answer: "Puedes registrarte en un hackathon navegando a la sección 'Hackathones' en nuestra web, seleccionando el evento de tu interés y haciendo clic en 'Registrarse'. Completa el formulario de inscripción para confirmar tu participación."
        },
        {
            question: "¿Qué tipo de proyectos se pueden presentar?",
            answer: "En HackaVerse, los proyectos pueden variar ampliamente, desde aplicaciones móviles y software hasta hardware y soluciones creativas. Asegúrate de revisar las categorías y requisitos específicos del hackathon en el que estás participando."
        },
        {
            question: "¿Cómo se seleccionan los ganadores de un hackathon?",
            answer: "Los ganadores son seleccionados por un panel de jueces basado en criterios como innovación, funcionalidad, presentación y relevancia del proyecto en relación con el tema del hackathon. Los detalles sobre los criterios específicos se proporcionan en la descripción del evento."
        },
        {
            question: "¿Qué tipo de soporte está disponible durante el hackathon?",
            answer: "Durante el hackathon, puedes acceder a recursos como mentores, materiales de apoyo y asistencia técnica a través de nuestro sistema de soporte en línea. Los detalles específicos se proporcionan en la sección de soporte del hackathon al que te has registrado."
        }
    ];

    return (
        <main className="flex items-center justify-center px-4">
            <section className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Preguntas Frecuentes
                </h1>
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="text-2xl font-semibold text-blue-600">
                            {faq.question}
                        </h2>
                        <p className="mt-2 text-gray-700">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default FAQPage;
