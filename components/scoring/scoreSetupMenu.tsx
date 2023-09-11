import Dropdown from "@/components/general/dropdown";
import Slider from "@/components/general/slider";
import Button from "@/components/general/button";

type ScoreSetupMenuProps = {
    updateLocation: (value: string) => void;
    updateDistanceUnit: (value: string) => void;
    updateDistance: (value: number) => void;
    updateEnds: (value: number) => void;
    updateArrowsPerEnd: (value: number) => void;
    updateSplitEnds: (value: number) => void;
    updateBow: (value: string) => void;
    startScoring: () => void;
}

export default function ScoreSetupMenu(props: ScoreSetupMenuProps) {
    const {
        updateLocation,
        updateDistanceUnit,
        updateDistance,
        updateEnds,
        updateArrowsPerEnd,
        updateSplitEnds,
        updateBow,
        startScoring,
    } = props;

  return (
    <section className='flex flex-col gap-2 items-center'>
      <Dropdown
        title='Location'
        items={["Indoor", "Outdoor"]}
        setSelected={updateLocation}
      />
      <div className='flex gap-2 items-center'>
        <Slider
          title='Distance'
          jump={1}
          defaultValue={18}
          min={1}
          max={100}
          update={updateDistance}
        />
        <Dropdown
          title='Distance Unit'
          items={["M (meters)", "YD (yards)", "FT (feet)"]}
          setSelected={updateDistanceUnit}
        />
      </div>
      <Slider
        title='Ends'
        jump={1}
        defaultValue={10}
        min={1}
        max={40}
        update={updateEnds}
      />
      <Slider
        title='Arrow Per End'
        jump={1}
        defaultValue={3}
        min={1}
        max={12}
        update={updateArrowsPerEnd}
      />
      <Slider
        title='Split Ends'
        jump={1}
        defaultValue={1}
        min={1}
        max={4}
        update={updateSplitEnds}
      />
      <Dropdown
        title='Bow'
        items={["Barebow", "Olympic Recurve", "Compound"]}
        setSelected={updateBow}
      />
      <Button title='Start Scoring' onClick={startScoring} />
    </section>
  );
}
