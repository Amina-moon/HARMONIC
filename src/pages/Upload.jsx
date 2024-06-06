import React from 'react';
import styled from "styled-components";
export const CreateFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;

`;


export const CreateFormInput = styled.input`
  
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid silver;
  border-radius: 14px;
  box-sizing: border-box;
  
`;

export const CreateFormButton = styled.button`
  
  margin-top: 10px;
  padding: 5px 10px;
  background-color:#757575 ;
  border-radius: 5px;
  color: white;
  border: none;
  width:10%;
`;
export const CreateFormSubmitButton=styled.button`
 width: 50%;
  background-color:#757575 ;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  `

const Create = () => {

  return (
    <div>
      <CreateFormContainer>
        <CreateFormInput type="text" id="songName" name="songName" placeholder="Song Name" />
        <CreateFormInput  type="file" name="src" placeholder="Song File"/>
          {/* <CreateFormButton>Upload Song File</CreateFormButton> */}
        <CreateFormInput  type="text" name="author" placeholder="Author"/>
        <CreateFormInput  type="file" name="thumbnail" placeholder="Image File" />
          {/* <CreateFormButton>Upload Image File</CreateFormButton> */}
        <CreateFormInput type="text" name="releaseDate" placeholder="Release Date"/>
        <CreateFormSubmitButton>Add Track </CreateFormSubmitButton>
         
      </CreateFormContainer>
    </div>
  );
};

export default Create;