import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import avatarPng from "@/assets/avatar.png";
import avatarJpg from "@/assets/avatar.jpg";
import CalendarIcon from "@/assets/calendar.svg";

import style from "./App.module.scss";

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const onClickPlus = () => {
    setCount((prev) => prev + 1);
  };

  const onClickMinus = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <div data-testid={"App.container.test"}>
      <h1>{__PLATFORM__}</h1>
      <div className={style.gallery}>
        <img src={avatarPng} alt="Аватар" />
        <img src={avatarJpg} alt="Аватар" />
        <CalendarIcon width={50} height={50} />
      </div>
      <div style={{ display: "flex", columnGap: 10 }}>
        <Link to="/">Home page</Link>
        <Link to="/about">About link</Link>
        <Link to="/shop">Shop link</Link>
      </div>
      <h1>Hello, World!</h1>
      <div className={style.value}>Count: {count}</div>
      <button className={style.button} onClick={onClickPlus}>
        Plus
      </button>
      <button className={style.button} onClick={onClickMinus}>
        Minus
      </button>
      <Outlet />
    </div>
  );
};
