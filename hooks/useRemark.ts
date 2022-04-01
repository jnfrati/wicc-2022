/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Ref, useEffect, useRef, useState } from "react";

const useRemark = (): { remarkRef: Ref<HTMLDivElement> } => {
  const divRef = useRef<HTMLDivElement>();
  const [remarkInstance, setRemarkInstance] = useState();

  useEffect(() => {
    const setupRemark = () => {
      if (!window?.remark_config) {
        // eslint-disable-next-line no-console
        console.error("Remark config doesn't exist");
        return;
      }

      if (!divRef.current) {
        return;
      }
      if (window?.REMARK42?.destroy) {
        return;
      }
      setRemarkInstance(
        window.REMARK42.createInstance({
          node: divRef,
          // @ts-ignore
          ...window.remark_config, // See <https://github.com/patarapolw/remark42#setup-on-your-website>
        })
      );
    };

    if (window && window?.REMARK42) {
      if (remarkInstance) {
        // @ts-ignore
        remarkInstance?.destroy();
      }
      setupRemark();
    } else {
      window?.addEventListener("REMARK42::ready", () => setupRemark());
    }

    return () => {
      // @ts-ignore
      remarkInstance?.destroy();
    };
  }, [remarkInstance, setRemarkInstance]);
  return {
    remarkRef: divRef,
  };
};

export default useRemark;
