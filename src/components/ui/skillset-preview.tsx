export type SkillsetPreviewVariant = "web" | "interface" | "graphic";

export function SkillsetPreview({ variant }: { variant: SkillsetPreviewVariant }) {
  if (variant === "web") {
    return (
      <div className="flex h-full w-full flex-col bg-[#F7F5F0] p-5 text-[#151515]">
        <div className="flex items-center justify-between border-b border-black/15 pb-3">
          <span className="text-[8px] font-semibold tracking-[0.12em]">YURLZ.STUDIO®</span>
          <div className="flex gap-1">
            <span className="h-1 w-1 rounded-full bg-[#283EC9]" />
            <span className="h-1 w-1 rounded-full bg-[#283EC9]" />
          </div>
        </div>
        <div className="relative flex flex-1 items-center">
          <p className="relative z-10 max-w-[170px] text-[34px] font-medium leading-[0.95] tracking-[-0.065em]">
            Made to<br />stand out.
          </p>
          <div className="absolute right-1 h-28 w-28 rounded-full bg-[#283EC9]" />
          <div className="absolute right-6 h-16 w-16 rotate-[-25deg] border-[10px] border-[#AEB8FF]" />
        </div>
        <div className="flex items-center justify-between border-t border-black/15 pt-3 text-[7px] uppercase tracking-[0.14em]">
          <span>Web Design</span>
          <span>Create. Connect.</span>
        </div>
      </div>
    );
  }

  if (variant === "interface") {
    return (
      <div className="h-full w-full bg-[#DFE4FA] p-5 text-[#20253D]">
        <div className="flex h-full overflow-hidden rounded-lg border border-[#283EC9]/10 bg-white shadow-lg shadow-[#283EC9]/10">
          <div className="flex w-12 shrink-0 flex-col items-center gap-3 border-r border-[#E8EAF2] bg-[#F6F7FC] py-4">
            <span className="mb-2 h-5 w-5 rounded-md bg-[#283EC9]" />
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="h-1.5 w-4 rounded-full bg-[#C9CFE5]" />
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">Design system</span>
              <span className="h-4 w-4 rounded-full bg-[#DCE2FF]" />
            </div>
            <div className="mb-4 mt-2 h-1 w-20 rounded-full bg-[#E2E5F0]" />
            <div className="grid grid-cols-2 gap-2">
              <div className="flex h-14 items-center justify-center rounded-md bg-[#EEF1FF]">
                <span className="rounded-full bg-[#283EC9] px-3 py-1 text-[7px] text-white">Explore</span>
              </div>
              <div className="flex h-14 items-center justify-center gap-1 rounded-md bg-[#F4F5F9]">
                {["#283EC9", "#AEB8FF", "#DFE4FA"].map((color) => (
                  <span key={color} className="h-5 w-5 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
            <div className="mt-2 flex flex-1 items-center gap-2 rounded-md border border-[#E8EAF2] px-3">
              <span className="h-6 w-6 shrink-0 rounded-md bg-[#DCE2FF]" />
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="h-1 w-3/4 rounded-full bg-[#BFC8E6]" />
                <span className="h-1 w-1/2 rounded-full bg-[#E2E5F0]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#283EC9] p-5 text-[#F7F5F0]">
      <div className="relative z-10 flex justify-between text-[7px] uppercase tracking-[0.16em]">
        <span>Yurlz Studio</span>
        <span>Graphic Design</span>
      </div>
      <span className="absolute -left-3 top-0 text-[235px] font-medium leading-none tracking-[-0.1em]">Y</span>
      <div className="absolute -right-10 top-10 h-40 w-40 rounded-full border-[24px] border-[#AEB8FF]" />
      <div className="absolute -right-6 top-24 h-40 w-40 rounded-full border-[24px] border-[#F7F5F0]/30" />
      <p className="relative z-10 mt-auto self-end text-right text-[22px] font-medium leading-[1.05] tracking-[-0.04em]">
        Make<br />your mark.
      </p>
    </div>
  );
}
