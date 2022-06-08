function move(element) {
  element.style.position = "fixed";

  function moveToCoordinates(left, bottom) {
    element.style.left = left + "px";
    element.style.bottom = bottom + "px";
    element.style.zIndex = window.innerHeight - bottom;
  }

  function moveWithArrowKeys(left, bottom, callback) {
    let direction = null;
    let x = left;
    let y = bottom;

    element.style.left = `${x}px`;
    element.style.bottom = `${y}px`;

    const moveCharacter = () => {
      if (direction === "west" && x >= 0) x--;
      if (direction === "north" && y <= window.innerHeight) y++;
      if (direction === "east" && x <= window.innerHeight) x++;
      if (direction === "south" && y >= 0) y--;
      element.style.left = `${x}px`;
      element.style.bottom = `${y}px`;
      element.style.zIndex = window.innerHeight - y;
    };

    setInterval(moveCharacter, 1);

    document.addEventListener("keydown", function (e) {
      if (e.repeat) return;

      if (e.key === "ArrowLeft") {
        direction = "west";
      }
      if (e.key === "ArrowUp") {
        direction = "north";
      }
      if (e.key === "ArrowRight") {
        direction = "east";
      }
      if (e.key === "ArrowDown") {
        direction = "south";
      }
      callback && callback(direction);
    });

    document.addEventListener("keyup", function (e) {
      direction = null;

      callback && callback(direction);
    });
  }

  return {
    to: moveToCoordinates,
    withArrowKeys: moveWithArrowKeys,
  };
}
