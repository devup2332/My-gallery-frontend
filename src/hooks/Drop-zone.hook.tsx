import { ChangeEvent, useEffect, useRef, useState } from "react";

const UseDropzone = () => {
  const [url, setUrl] = useState<string | null | ArrayBuffer>("");
  const [file, setFile] = useState<File | null>(null);
  const dropSection = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result);
      };

      reader.readAsDataURL(file);

      return setFile(file);
    }
  };

  useEffect(() => {
    const preventDefaults = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const setStyle = () => {
      dropSection.current?.classList.add("on");
    };

    const dropStyle = () => {
      dropSection.current?.classList.remove("on");
    };

    const readImage = (e: DragEvent) => {
      const file = e.dataTransfer?.files[0];
      const dt = new DataTransfer();
      const input = document.querySelector<HTMLInputElement>(".inputFIle");

      if (!file || !input) {
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        setUrl(reader.result);
      };

      reader.readAsDataURL(file);

      dt.items.add(file);
      input.files = dt.files;

      return setFile(file);
    };

    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropSection.current?.addEventListener(eventName, preventDefaults);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropSection.current?.addEventListener(eventName, setStyle);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropSection.current?.addEventListener(eventName, dropStyle);
    });
    dropSection.current?.addEventListener("drop", readImage);

    return () => {
      console.log("Removed all listeners");

      ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropSection.current?.removeEventListener(eventName, preventDefaults);
      });

      ["dragenter", "dragover"].forEach((eventName) => {
        dropSection.current?.removeEventListener(eventName, setStyle);
      });

      ["dragleave", "drop"].forEach((eventName) => {
        // eslint-disable-next-line
        dropSection.current?.removeEventListener(eventName, dropStyle);
      });
      dropSection.current?.removeEventListener("drop", readImage);
    };
  }, []);

  return { handleChange, url, file, dropSection, setUrl, setFile };
};

export default UseDropzone;
