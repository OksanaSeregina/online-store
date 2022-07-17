import { ISlider } from '../../slider';

export function getSliderConfig(title: string, id: string, { min, max }: { min: string; max: string }): ISlider {
  return { title, id, min, max, range: [min, max] };
}
