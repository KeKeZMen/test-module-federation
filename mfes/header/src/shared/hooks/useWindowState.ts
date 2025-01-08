import { useCallback, useEffect, useState } from "react";
import { EventBus } from "../utils/EventBus";

const useWindowState = <T>(key: string, initValue?: T) => {
  const [state, setState] = useState<T>(initValue);

  const handleEmit = useCallback(
    (newValue: T) => {
      EventBus.emit(key, { detail: { value: newValue } });
    },
    [key]
  );

  const handleState = useCallback(
    (event: CustomEvent) => setState(event.detail.value as T),
    []
  );

  useEffect(() => {
    if (initValue !== undefined) {
      EventBus.emit(key, { detail: { value: initValue } });
    }
  }, [initValue, key]);

  useEffect(() => {
    EventBus.on(key, handleState);

    return () => {
      EventBus.off(key, handleState);
    };
  }, [key, handleState, initValue]);

  return [state, handleEmit] as const;
};

export default useWindowState;
