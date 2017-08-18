import React, { Component } from "react";
import {Helmet} from 'react-helmet';

export default class Results_2 extends Component {
 render() {
  return (
   <div>
    <Helmet
		title="title2"
		meta={[
			{property: 'og:title', content: "title2"},
	]} />
   </div>
  )
 }
}