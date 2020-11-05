import React, { useState } from 'react';
// import { Loading } from 'components/loading/loading';
import { useCustomForm } from 'hooks/useCustomForm';
import './Details.css';
import { Header } from 'components/header/header';
import editIcon from 'assets/edit_icon.png';
import { Footer } from 'components/footer/footer';
import { Body } from 'components/body/body';
import { useHistory } from 'react-router-dom';
import useHomeData from 'pages/Home/useHomeData';
import { Button } from 'components/button/button';
import favor from 'assets/favor.svg';
import disfavor from 'assets/disfavor.svg';

export const Details = (props) => {
  const initialValues = props.location.state.character;
  const [isFavorite, setIsFavorite] = useState(initialValues.favorite)
  const history = useHistory();

  const {
    saveEditCharacter,
  } = useHomeData();

  const {
    values,
    handleChange,
    handleSubmit
  } = useCustomForm({
    initialValues,
    onSubmit: values => saveChanges(values)
  });

  const saveChanges = ({ values }) => {
    const characterEdited = {
      id: values.id,
      name: values.name,
      gender: values.gender,
      realName: values.real_name,
      aliases: values.aliases,
      birth: values.birth,
      favorite: isFavorite
    }
    saveEditCharacter(characterEdited);
    backToHome();
  }

  const backToHome = () => {
    history.push('/');
  }

  const allImages = Object.keys(values.image).map(function (key, index) {
    return key.includes('url') &&
      <div className="img-box" key={index}><img alt={`${index}`} src={values.image[key]} /><span>{key}</span></div>;
  });

  return (
    <div className="container">
      <Header>
        <Button title="Back" onClick={backToHome} className="back-button" />
        <Button title="Submit" onClick={handleSubmit} className="submit-button" />
      </Header>

      <Body>
        <div className="img-container">
          {allImages}
        </div>
        <div className="form-style">
          <ul>
            <div className="first-fields-line">
              <li>
                <label>Favorite <img src={editIcon} /></label>
                <input
                  type="checkbox"
                  name="favorite"
                  checked={isFavorite}
                  onChange={handleChange}
                />
                <img className="favorite-icon" src={isFavorite ? favor : disfavor}
                  alt="favorite" onClick={() => setIsFavorite(!isFavorite)} />
              </li>
              <li>
                <label>Gender <img src={editIcon} /></label>
                <input
                  name="gender"
                  type="checkbox"
                  checked={values.gender === 1}
                  value={1}
                  onChange={handleChange}
                />Male
                &nbsp;
                <input
                  name="gender"
                  type="checkbox"
                  value={2}
                  checked={values.gender === 2}
                  onChange={handleChange}
                />Female
              </li>
              <li>
                <label>Birth <img src={editIcon} /></label>
                <input
                  type="date"
                  name="birth"
                  onChange={handleChange}
                  value={values.birth ?? ''}
                />
              </li>
            </div>
            <li>
              <label>Name <img src={editIcon} /></label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
            </li>
            <li>
              <label>Real Name <img src={editIcon} /></label>
              <input
                type="text"
                name="real_name"
                onChange={handleChange}
                value={values.real_name}
              />
            </li>
            <li>
              <label>Aliases <img src={editIcon} /></label>
              <textarea
                rows={5}
                name="aliases"
                onChange={handleChange}
                value={values.aliases}
              />
            </li>
            <li>
              <label>Description</label>
              <div className="description" dangerouslySetInnerHTML={{ __html: values.description }}></div>
            </li>
          </ul>

        </div>
      </Body>

      <Footer />
    </div>
  );
}