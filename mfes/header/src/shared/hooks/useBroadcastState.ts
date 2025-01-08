import { useCallback, useEffect, useState } from "react";
import { BroadcastEventBus } from "../utils/BroadcastEventBus";

const useBroadcastState = <T>(key: string, initValue?: T) => {
  const [state, setState] = useState<T>(initValue);

  const handleEmit = useCallback(
    (newValue: T) => {
      BroadcastEventBus.emit(key, newValue);
    },
    [key]
  );

  const handleState = useCallback((data: T) => setState(data), []);

  useEffect(() => {
    if (initValue !== undefined) {
      BroadcastEventBus.emit(key, initValue);
    }
  }, [initValue, key]);

  useEffect(() => {
    BroadcastEventBus.on(key, handleState);

    return () => {
      BroadcastEventBus.off(key, handleState);
    };
  }, [key, handleState]);

  return [state, handleEmit] as const;
};

export default useBroadcastState;
