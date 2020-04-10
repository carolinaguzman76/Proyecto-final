import React, { Component } from 'react'

import './BarGraphic.css'

import CategoriesServices from '../../services/category.services'

import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated)

class BarGraphic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryWithBudget: []
    }
    this.categoriesServices = new CategoriesServices()
  }

  componentDidMount() {
    this.getAllCategories()
  }

  getAllCategories = () => {
    this.categoriesServices.getAllCategories()
      .then(allCategories => {
        this.setState({ categoryWithBudget: allCategories })
        this.categoriesGraphic()
      })
      .catch(err => console.log(err))
  }

  categoriesGraphic = () => {
    let chart = am4core.create("chartdiv", am4charts.XYChart)

    chart.data = this.state.categoryWithBudget
    
    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "name";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    function createSeries(field, fieldName) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "name";
      series.name = fieldName;
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;

      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = fieldName;
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }

    this.chart = chart;

    createSeries("budget", "Presupuesto");
    createSeries("amount", "Saldo periodo");

  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    )
  }
}


export default BarGraphic