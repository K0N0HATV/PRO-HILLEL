import React from 'react';

function FavoriteAnimal({ animal, onAnimalChange }) {
    return (
        <div>
            <label htmlFor="animal">Favorite Animal: </label>
            <input
                placeholder='animal'
                id="animal"
                value={animal}
                onChange={onAnimalChange}
            />
        </div>
    )
}

export default FavoriteAnimal;