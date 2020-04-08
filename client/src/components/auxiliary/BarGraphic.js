import React, { Component } from 'react'

import './BarGraphic.css'

import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"

am4core.useTheme(am4themes_animated)

class BarGraphic extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart)

    chart.data = [{
      "categoryName": "Supermercado",
      "budget": 200,
      "periodBalance": 340
    }, {
      "categoryName": "Electronica",
      "budget": 600,
      "periodBalance": 530
    }, {
      "categoryName": "Mascotas",
      "budget": 320,
      
      "periodBalance": 301
    }, {
      "categoryName": "Regalos",
      "budget": 470,
      "periodBalance": 425
    }, {
      "categoryName": "Extra",
      "budget": 120,
      "periodBalance": 25
    }];


    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "categoryName";
    // categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;

    function createSeries(field, name) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "categoryName";
      series.name = name;
      series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
      series.columns.template.height = am4core.percent(100);
      series.sequencedInterpolation = true;

      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      valueLabel.label.text = "{valueX}";
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.text = "{name}";
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }
    
    this.chart = chart;

    createSeries("budget", "Presupuesto");
    createSeries("periodBalance", "Saldo periodo");

  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    )
  }
}


export default BarGraphic