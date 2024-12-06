import { useRef, useEffect } from "react";
import { Container } from "./Content.js";
import Tabs from "../Tabs/Tabs.jsx";
import CreateGroup from "../CreateGroup/CreateGroup.jsx";

export default function Content() {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollContainerRef.current) {
        const { deltaY } = event;
        scrollContainerRef.current.scrollTop += deltaY;
        event.preventDefault(); // Evita o comportamento de rolagem padrão
      }
    };

    const container = scrollContainerRef.current;
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <Container ref={scrollContainerRef}>
      <CreateGroup />
      <Tabs />
    </Container>
  );
}
