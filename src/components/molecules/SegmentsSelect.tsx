import { createClient } from "@/src/utils/supabase/client/createClient";
import { BaseSelect } from "../atoms/BaseSelect";
import { useEffect, useState } from "react";
import { Segmentos } from "@/src/lib/supabase/customTypes";

interface Props {
  onChange?: (value: string) => void;
}

export default function SegmentsSelect({ onChange }: Props) {
  const [segmentos, setSegmentos] = useState<Segmentos[] | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from("segmentos").select("*");

        if (error) {
          console.error(error);
          return;
        }

        setSegmentos([...(data || []), { id: 0, nome: "Outro" }]);
      } catch (err) {
        console.error(err);
      } finally {
      }
    };

    fetchData();
  }, []);

  return (
    <BaseSelect
      placeholder="Selecione um segmento"
      label="Segmentos"
      items={segmentos || []}
      onChange={onChange}
    />
  );
}
