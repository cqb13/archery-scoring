const Stat = (props) => {
  return (
    <div className='Stat'>
      <h2>
        {props.title}: {props.stat}
      </h2>
      {props.note ? <p>{props.note}</p> : null}
    </div>
  );
};

export default Stat;
