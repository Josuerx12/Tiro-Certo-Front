import * as XLSX from "xlsx";
import { IRegister } from "../interfaces/IRegister";
import { format } from "date-fns";

export const useGenerateXlsx = () => {
  const generateAndDownloadXLSX = (registers: IRegister[]) => {
    registers.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (registers) {
      const data = [
        [
          "Nome",
          "CPF",
          "CR",
          "Clube de Execução",
          "Atividade",
          "Execução da atividade",
          "Armas utilizadas",
        ],
        ...registers.map((r) => {
          const rDate = format(r.createdAt, "dd/MM/yyyy");
          return [
            r.name,
            r.cpf,
            r.cr,
            r.club.name,
            r.activity,
            rDate,
            r.weapons
              .map(
                (w) =>
                  `Armamento: ${w.name} / Disparos: ${w.disparos} / Registro:${w.registro}`
              )
              .join(", "),
          ];
        }),
      ];

      const ws = XLSX.utils.aoa_to_sheet(data);

      ws["!autofilter"] = {
        ref: XLSX.utils.encode_range({
          s: { r: 0, c: 0 },
          e: { r: 0, c: data[0].length - 1 },
        }),
      };

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Registros");

      const blob = XLSX.writeFileXLSX(
        wb,
        `Registros-de-${registers[0].name}-gerado-${new Date(
          Date.now()
        ).toLocaleString("pt-BR")}.xlsx`
      );

      const a = document.createElement("a");
      a.download = blob;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      URL.revokeObjectURL(blob);
    } else {
      return alert(
        "Não foi possivel gerar a lista de registros por falta de dados."
      );
    }
  };
  return { generateAndDownloadXLSX };
};
