import { useRef, useEffect, RefObject } from "react";
import * as d3 from "d3";

type RenderChartFn = (selection: d3.Selection<SVGElement, unknown, null, undefined>) => void;

export const useD3 = (renderChartFn: RenderChartFn): RefObject<SVGElement> => {
  const ref = useRef<SVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      renderChartFn(d3.select(ref.current));
    }
    return () => {};
  }, [ref.current]);

  return ref;
};