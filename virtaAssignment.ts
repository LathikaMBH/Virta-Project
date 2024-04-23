/* 
Author: Lathika Herath
Date: 2024-04-18
Purpose: Virta Assignment 
*/

async function sendRequest(
    stationID: number | null,
    command: string | null,
    payload?: number | string | null
  ): Promise<any> {
    const url = `https://api-energy-k8s.test.virtaglobal.com/v1/tests/${stationID}`;
    const body = { command, payload };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
  
      if (response.status !== 200) {
        throw new Error(
          `Error sending request to station ${stationID}: ${response.statusText}`
        );
      }
  
      return response.json();
    } catch (error) {
      return error.message;
    }
  }
  
  async function testStationProcess(stationID: number | null): Promise<void> {
    if (stationID === null) {
      console.log("Station value is null");
      return;
    }
    //=================setValues Test Cases ===============================
    /*TestCase 01
    setValues
    Happy path 1 */
    for (let n = 2; n < 10; n++) {
      const setValueValidRangeResponse = await sendRequest(
        stationID,
        "setValues",
        n
      );
      if (
        setValueValidRangeResponse &&
        setValueValidRangeResponse?.result === "OK"
      ) {
        console.log(`Test case 01: Test case is passed: value: ${n}`);
      } else {
        console.log(`Test case 01: Test case is failed: value: ${n}`);
      }
    }
  
    /*TestCase 02
    setValues 
    More than 10 values */
  
    const setValueLargeRangeResponse = await sendRequest(
      stationID,
      "setValues",
      15
    );
    if (
      setValueLargeRangeResponse &&
      setValueLargeRangeResponse?.result === "FAILED"
    ) {
      console.log("Test case 02:  Test case is passed: value: 15 ");
    } else {
      console.log("Test case 02: Test case is failed: value: 15");
    }
  
    /* Test case 03
    setValues
    Boundary Values */
  
    let boundaryValues: number[] = [1, 1.5, 10, 10.5];
  
    for (const boundaryValue of boundaryValues) {
      const setValueBoundaryValueResponse = await sendRequest(
        stationID,
        "setValues",
        boundaryValues[boundaryValue]
      );
      if (
        setValueBoundaryValueResponse &&
        setValueBoundaryValueResponse.result === "OK"
      ) {
        console.log(`Test case 03: Test case is passed: value: {${boundaryValue}}`);
      } else {
        console.log("Test case 03: Test case is failed: unexpected error");
      }
    }
  
    /*Test case 04
        setValues
        Minus values */
  
    const setValueNegativeValues = await sendRequest(stationID, "setValues", -1);
    if (setValueNegativeValues?.result === "FAILED") {
      console.log("Test case 04: Test case is passed: value -1");
    } else {
      console.log("Test case 04: Test case is failed: unexpected error");
    }
  
    /*Test case 05
        setValues
        Value zero */
  
    const setValueZero = await sendRequest(stationID, "setValues", 0);
    if (setValueZero?.result === "FAILED") {
      console.log("Test case 05: Test case is passed: value 0");
    } else {
      console.log("Test case 05: Test case is failed: unexpected error");
    }
  
    /* Test case 06
        setValues
        Value decimal with 2-9 */
  
    const setValueDecimalWithinRange = await sendRequest(
      stationID,
      "setValues",
      6.99
    );
    if (setValueDecimalWithinRange?.result === "OK") {
      console.log("Test case 06: Test case is passed: value 6.99");
    } else {
      console.log("Test case 06: Test case is failed: unexpected error");
    }
  
    /* Test case 07
        setValues
        Value decimal more than 10 */
  
    const setValueDecimalMoreThanUpperLevel = await sendRequest(
      stationID,
      "setValues",
      15.66
    );
    if (setValueDecimalMoreThanUpperLevel?.result === "OK") {
      console.log("Test case 07: Test case is passed: value 15.66");
    } else {
      console.log("Test case 07: Test case is failed: unexpected error");
    }
  
    /* Test case 08
        setValues
        Value = null */
  
    const setValuesNull = await sendRequest(stationID, "setValues", null);
    if (setValuesNull?.result === "FAILED") {
      console.log("Test case 08: Test case is passed: value = null");
    } else {
      console.log("Test case 08: Test case is failed: result is OK");
    }
  
    /* Test case 09
        setValues
        Value string */
  
    const setValuesString = await sendRequest(
      stationID,
      "setValues",
      "testString"
    );
    if (
      setValuesString?.message === "Unexpected token d in JSON at position 43"
    ) {
      console.log("Test case 09:Test case is passed: Error has handled for string values");
    } else {
      console.log("Test case 09: Test case is failed: unexpected error");
    }
  
    console.log("\n----------- SetValue Test cases are completed---------------\n")
    //====================== getInterval ===========================
  
    /* Test case 10
        getInterval
        Positive values */
  
    const getIntervalResponse = await sendRequest(stationID, "getInterval", 10);
    if (1 <= getIntervalResponse?.result && getIntervalResponse?.result <= 60) {
      console.log("Test case 10: Test case is passed: value 10(positive values)");
    } else {
      console.log("Test case 10: Test case is failed: unexpected error");
    }
  
    /* Test case 11
        getInterval
        Negative Values */
  
    const getIntervalNegativeValues = await sendRequest(
      stationID,
      "getInterval",
      -10
    );
    if (
      1 <= getIntervalNegativeValues?.result &&
      getIntervalNegativeValues?.result <= 60
    ) {
      console.log("Test case 11: Test case is passed: value (-10)");
    } else {
      console.log("Test case 11: Test case is failed: unexpected error");
    }
  
    /* Test case 12
        getInterval
        Value zero */
  
    const getIntervalValueZero = await sendRequest(stationID, "getInterval", 0);
    if (1 <= getIntervalValueZero?.result && getIntervalValueZero?.result <= 60) {
      console.log("Test case 12: Test case is passed: value 0");
    } else {
      console.log("Test case 12: Test case is failed: unexpected error");
    }
  
    /* Test case 13
        getInterval
        Value string */
  
    const getIntervalStringValue = await sendRequest(
      stationID,
      "getInterval",
      "testString"
    );
    if (
      getIntervalStringValue?.message ===
      "Unexpected token d in JSON at position 41"
    ) {
      console.log("Test case 13: Test case is passed: value testString");
    } else {
      console.log("Test case 13: Test case is failed: unexpected error");
    }
  
    /* Test case 14
        getInterval
        Value decimal */
  
    const getIntervalDecimalValue = await sendRequest(
      stationID,
      "getInterval",
      10.99
    );
    if (
      1 <= getIntervalDecimalValue?.result &&
      getIntervalDecimalValue?.result <= 60
    ) {
      console.log("Test case 14: Test case is passed: value decimal");
    } else {
      console.log("Test case 14: Test case is failed: unexpected error");
    }

    console.log("\n------------- getInterval Test Cases are completed -----------\n")
  
    //======================== getVersion ===========================
  
    /* Test case 15
        getVersion
        Value positive */
  
    const getVersionPositiveValue = await sendRequest(
      stationID,
      "getVersion",
      10
    );
    if (getVersionPositiveValue?.result > 1.6) {
      console.log("Test case 15: Test case is passed: Version is more than 1.6");
    } else {
      console.log("Test case 15: Test case is failed: result is less than or equal to 1.6");
    }
  
    /* Test case 16
        getVersion
        Value Minus */
  
    const getVersionMinusValue = await sendRequest(stationID, "getVersion", -2);
    if (getVersionMinusValue?.result > 1.6) {
      console.log("Test case 16: Test case is passed: Version is more than 1.6");
    } else {
      console.log("Test case 16: Test case is failed: Version is less than or equal to 1.6");
    }
  
    /* Test case 17
        getVersion
        Value Decimal */
  
    const getVersionDecimalValue = await sendRequest(
      stationID,
      "getVersion",
      5.55
    );
    if (getVersionDecimalValue?.result > 1.6) {
      console.log("Test case 17: Test case is passed: version more than 1.6");
    } else {
      console.log("Test case 17: Test case is failed: version is less than or equal to 1.6");
    }
  
    /* Test case 18
        getVersion
        Value Zero */
  
    const getVersionZero = await sendRequest(stationID, "getVersion", 0);
    if (getVersionZero?.result > 1.6) {
      console.log("Test case 18: Test case is passed: Version is more than 1.6");
    } else {
      console.log("Test case 18: Test case is failed: Version is less than or equal to 1.6");
    }

    console.log("\n----------- getVersion Test Cases are completed --------------\n")
  }


  const executeTest = async () => {

    for (const stationId of [1,2,3,4,5]) {
      console.log(` ========= station id ${stationId} ========= `);
      await testStationProcess(stationId);
    }
    console.log("--- Testing completed ---");
  };
  
  executeTest();
  