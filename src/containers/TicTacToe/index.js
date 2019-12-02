import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { StyledTicTacToe } from "./Styled";
import { NOUSE, CROSS, TOGGLE, GAME_SCALE_OPTIONS, WINNER_CONDITION_OPTIONS } from "./constants";
import { initBlocks, checkWin } from "./utils";
import Selection from './components/Selection';
import ToggleSwitchBtn from './components/ToggleSwitchBtn';
import InfoBoard from "./components/InfoBoard";
const INIT_WIN_STATE = {
  isGameFinished: false,
  winner: NOUSE
};
const TicTacToe = ({ setting }) => {
  const { gameScale } = setting;
  const [isWin, setWin] = useState(INIT_WIN_STATE);
  const [blocks, setBlocks] = useState(initBlocks());
  const [currentRole, setCurrentRole] = useState(CROSS);
  const [isSinglePlay, setSinglePlay] = useState(false);

  const handleOnRestartClick = () => {
    setCurrentRole(CROSS);

    setBlocks(initBlocks());

    setWin(INIT_WIN_STATE);
  };

  const handleOnToggleSwitchClick = () => {
    setSinglePlay(!isSinglePlay);
  };

  const handleOnWinnerConditionSelected = () => {

  };

  const handleOnGameScaleSelected = () => {

  };

  const handleClick = event => {
    if (isWin.isGameFinished) {
      return;
    }
    const id = +event.currentTarget.getAttribute("data-id");

    for (let i = 0; i < blocks.length; ++i) {
      let block = blocks[i];
      if (block.id === id && !block.hasOwner()) {
        blocks[i].owner = currentRole;

        setCurrentRole(currentRole * TOGGLE);
        setBlocks(blocks);


        break;
      }
    }
  };


  useEffect(() => {
    console.log('#1');
    const winner = checkWin(blocks);
    if (winner !== 0) {
      setWin({
        isGameFinished: true,
        winner: winner
      });
    } else {
      const sum = blocks.reduce((c, block) => {
        return c + (block.hasOwner() ? 1 : 0);
      }, 0);
      const gameEnd = sum === gameScale * gameScale;
      if (gameEnd) {
        setWin({
          isGameFinished: true,
          winner: ""
        });
      }

    }
  }, [blocks, currentRole]);



  return (
    <StyledTicTacToe gameScale={gameScale}>
      <div>
        <InfoBoard currentRole={currentRole} isWin={isWin} />
      </div>
      <div className="tic-tac-toe__blocks-wrapper">
        {blocks.map(block => (
          <div
            className="tic-tac-toe__item"
            key={block.id}
            data-id={block.id}
            onClick={handleClick}
          >
            {block.draw()}
          </div>
        ))}
      </div>
      <button
        className="tic-tac-toe__restart-btn"
        onClick={handleOnRestartClick}
      >
        Restart
      </button>

      <div className="tic-tac-toe__setting-group-wrapper">
        <div className="tic-tac-toe__setting-group">

          <span>Scale</span>
          <Selection options={GAME_SCALE_OPTIONS} handleOnSelect={handleOnGameScaleSelected} />
        </div>
        <div className="tic-tac-toe__setting-group">

          <span>Condition</span>
          <Selection options={WINNER_CONDITION_OPTIONS} handleOnSelect={handleOnWinnerConditionSelected} />
        </div>
        <div className="tic-tac-toe__setting-group">

          <span>Single Play</span>
          <ToggleSwitchBtn isSinglePlay={isSinglePlay} handleOnToggleSwitchClick={handleOnToggleSwitchClick} />
        </div>
      </div>
    </StyledTicTacToe>
  );
};

TicTacToe.propTypes = {
  setting: PropTypes.object,
};

export default TicTacToe;
