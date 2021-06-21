import { Film, Home, MapPin } from "react-feather";
import { ICharacterModel } from "../../api/types";
import "./style.scss";

interface IProps extends ICharacterModel {
  onClick: () => void;
}

const Character = (props: IProps) => {
  return (
    <div className="character">
      <h3 className="character__name">{props.name}</h3>
      <div className="character__summary">
        <span className="character__img">
          <img src={props.image} alt={props.name} />
        </span>
        <span className="character__description">
          <span className="description__item">
            <Home size={12} />
            <small className="ml-1 capitalize text--bold">{props.origin?.name}</small>
          </span>
          <span className="description__item">
            <MapPin size={12} />
            <small className="ml-1 capitalize text--bold">{props.location?.name}</small>
          </span>
          <span className="description__item">
            <Film size={12} />
            <small className="ml-1 capitalize text--bold">{props.episode?.length}</small>
          </span>

          <span className="flex flex-row content-end">
            <button className="view-more" onClick={props.onClick}>
              view
            </button>
          </span>
        </span>
      </div>
    </div>
  );
};

export default Character;
