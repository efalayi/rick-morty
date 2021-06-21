import React from "react";

import { ICharacterModel } from "../../api/types";
import "./style.scss";

const Character = (props: ICharacterModel) => {
  return (
    <div className="character">
      <h3 className="character__name">{props.name}</h3>
      <div className="character__summary">
        <span className="character__img">
          <img src={props.image} alt={props.name} />
        </span>
        <span className="character__description">
          <span className="description__item character__origin">
            <b>Origin: </b>
            <small className="capitalize">{props.origin.name}</small>
          </span>
          <span className="description__item character__location">
            <b>Location: </b>
            <small className="capitalize">{props.location.name}</small>
          </span>
          <span className="description__item character__episodes">
            <b>Episodes: </b>
            <small className="capitalize">{props.episode.length}</small>
          </span>

          <span className="flex flex-row content-end">
            <button className="view-more">More</button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Character;
