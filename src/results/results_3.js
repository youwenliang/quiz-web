import React, { Component } from "react";
import {Helmet} from 'react-helmet';

export default class Results_3 extends Component {
 render() {
  return (
   <div>
    <Helmet
		title="title3"
		meta={[
			{property: 'og:title', content: "title3"},
	]} />
   </div>
  )
 }
}