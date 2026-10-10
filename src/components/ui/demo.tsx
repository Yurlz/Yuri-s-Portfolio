import { Typewriter } from "@/components/ui/typewriter-text";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";

const DemoVariant1 = () => {
  return (
    <>
      <Typewriter
        text={["Welcome to HextaUI", "Build awesome websites.", "hextaui.com"]}
        speed={100}
        loop={true}
        className="text-xl font-medium"
      />
    </>
  );
};

export { DemoVariant1 };

export function TextGradientScrollExample() {
  return (
    <div className="relative min-h-[200vh] w-full">
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="mx-auto w-full max-w-5xl p-4">
          <div className="pointer-events-auto mx-auto flex min-h-[500px] w-full max-w-[700px] flex-col items-start justify-end p-4 pt-14 text-2xl">
            <TextGradientScroll text="The text gradient scroll component is designed to enhance user interaction by providing a visually dynamic effect as the user scrolls through the text. Unlike static text, this effect offers a more engaging visual experience with smooth color transitions that change as the text is scrolled. The animated gradient shifts add a modern and interactive touch to the user experience. This example was created using Tailwind CSS and Framer Motion." />
          </div>
        </div>
      </div>
      <div className="h-[200vh]" aria-hidden="true" />
    </div>
  );
}
