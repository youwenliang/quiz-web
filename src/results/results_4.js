import React, { Component } from "react";
import {Helmet} from 'react-helmet';

export default class Results_4 extends Component {
 render() {
  return (
   <div>
    <Helmet
		title="title4"
		meta={[
			{property: 'og:title', content: "title4"},
	]} />
   </div>
  )
 }
}