import React, { useEffect, useState } from "react";
import axios from "axios";
import noneCard from "../../Media/nonecard.png"
import "./Cartas.css"

function Cartas() {
  const [cards, setCards] = useState([]);
  const [page, setPage]= useState(1);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

/*   useEffect(() => {
    fetchCards();
  }, []); */

  useEffect(() => {
    fetchCards();
  }, [page]);

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        "https://api.magicthegathering.io/v1/cards",
        {
          params: {
            page: page,
            pageSize: 10,
            colorIdentity: "",
          },
        }
      );
      setCards(response.data.cards);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
	if (current<9){
		setCurrent(current + 1);
	} else{
		setCurrent(0);
		setPage(page + 1)
	}
  };

  const handleLast = () => {
	if (current>0){
		setCurrent(current - 1);
	} else{
		setCurrent(9);
		setPage(page - 1)
	}  };

  return (
    <div>
      {!loading ? (
        <>
          {cards[current].foreignNames ? (
            cards[current].foreignNames.map((item, index) => {
				console.log('current', current)
              if (item.language === "Spanish") {
                console.log("item", item);
                return (
                  <div key={index}>
					<div className="Content-Direction">
						<div onClick={handleLast}>◀️</div>
						<div onClick={handleNext}>▶️</div>
					</div>
                    <div>{item.name}</div>
					{item.imageUrl ? (
                      <img src={item.imageUrl} alt={index} />
                    ) : (
                      <img src={noneCard} alt="noneCard" />
                    )}
                  </div>
                );
              } else {
				return null
			  }
            })):(
					<div>
					 <div className="Content-Direction">
						<div onClick={handleLast}>◀️</div>
						<div onClick={handleNext}>▶️</div>
					</div>
					  <div>{cards[current].name}</div>
                      <img src={noneCard} alt="noneCard" />
                   	</div>
			)}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Cartas;
