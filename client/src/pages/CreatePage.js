import React, { useState } from "react";

export const CreatePage = () => {
  const [link, setLink] = useState("");
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Paste your link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)} // <======= updates the form
          />
          <label htmlFor="email">Email</label>
        </div>
      </div>
    </div>
  );
};
