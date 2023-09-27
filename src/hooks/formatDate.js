import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
dayjs.extend(relativeTime); // Personalizar los mensajes
dayjs.locale("es", {
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años",
  },
}); // Funcion que recibe la fecha de creacion y usa dayJs para formatearla
export const formatDate = (date) => {
  return dayjs(date).fromNow();
};
