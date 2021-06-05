import React from "react";
import { connect } from "react-redux";
const Alert = (props) => {
  return (
    <div style={{ position: "relative" }}>
      {props.alert !== null &&
        props.alert.length > 0 &&
        props.alert.map((item) => (
          <div key={item.id} className={`alert alert-${item.type}`}>
            {item.msg}
          </div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});
export default connect(mapStateToProps, {})(Alert);
