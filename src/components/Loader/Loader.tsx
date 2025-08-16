import { MoonLoader } from "react-spinners";
import style from "./Loader.module.css";

export default function Loader() {
  return <div className={style.backdrop}>{
  <MoonLoader color="#1bd453"/>

  }</div>;
}
