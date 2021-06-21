import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { ICharacterModel } from "../../api/types";

interface IProps {
  character: ICharacterModel | undefined;
  handleClose: () => void;
}

const CharacterModal = (props: IProps) => {
  const { character, handleClose } = props;
  const modalRoot = document.getElementById("modal-root");
  const element = document.createElement("div");
  element.classList.add("modal__overlay");

  const renderView = () => {
    return (
      <div className="modal">
        <div className="modal-content">
          <header className="modal__header">
            <h3>{character?.name}</h3>
            <button className="modal-close" onClick={handleClose}>
              close
            </button>
          </header>
          <div className="modal-body">
            <span className="w-full flex flex-column">
              <span className="flex flex-column items-center">
                <span className="img--thumnail">
                  <img src={character?.image} alt={character?.name} />
                </span>
                <span className="block py-2">
                  <span className="capitalize text--muted delimiter">{character?.gender}</span>
                  <span className="capitalize text--muted delimiter">{character?.species}</span>
                  <span className="capitalize text--muted">{character?.status}</span>
                </span>
              </span>
              <span className="block mb-1">
                <b>Origin: </b>
                <ul className="location-info">
                  {character?.origin.name && (
                    <li className="location-info__item capitalize">
                      {character.origin.name}
                    </li>
                  )}
                  {character?.origin.dimension && (
                    <li className="location-info__item capitalize">
                      {character.origin.dimension}
                    </li>
                  )}
                  {character?.origin.type && (
                    <li className="location-info__item capitalize">
                      {character.origin.type}
                    </li>
                  )}
                  {character?.origin.residents && (
                    <li className="location-info__item capitalize">
                      {character.origin.residents.length}
                    </li>
                  )}
                </ul>
              </span>
              <span className="block mb-1">
                <b>Location: </b>
                <ul className="location-info">
                  {character?.location.name && (
                    <li className="location-info__item capitalize">
                      {character.location.name}
                    </li>
                  )}
                  {character?.location.dimension && (
                    <li className="location-info__item capitalize">
                      {character.location.dimension}
                    </li>
                  )}
                  {character?.location.type && (
                    <li className="location-info__item capitalize">
                      {character.location.type}
                    </li>
                  )}
                  {character?.location.residents && (
                    <li className="location-info__item capitalize">
                      {character.location.residents.length}
                    </li>
                  )}
                </ul>
              </span>
              <span className="block">
                <b>Episodes: </b>
                <small className="capitalize">{character?.episode.join(", ")}</small>
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    modalRoot?.appendChild(element);

    return function unmount() {
      modalRoot?.removeChild(element);
    };
  }, [element, modalRoot]);

  return ReactDOM.createPortal(renderView(), element);
};

export default CharacterModal;
