import { useRef, useEffect } from "react";
import { Container } from "./Content.ts";
import Tabs from "../Tabs/Tabs.tsx";
import CreateGroup from "../CreateGroup/CreateGroup.tsx";

export default function Content() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (scrollContainerRef.current) {
        const { deltaY } = event;
        scrollContainerRef.current.scrollTop += deltaY;
        event.preventDefault(); // Evita o comportamento de rolagem padrão
      }
    };

    const container = scrollContainerRef.current;
    container?.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container?.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <Container ref={scrollContainerRef}>
      <CreateGroup />
      <Tabs />
    </Container>
  );
}
