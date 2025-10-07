import { Box, Button, Stack } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import TrendPropertyCard from "./TrendPropertyCard";
import TopCategoryPropertyCard from "./TopCategoryCard";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "../../../apollo/user/query";
import { MouseEvent, useCallback, useState } from "react";
import { Property } from "../../types/property/property";
import { T } from "../../types/common";
import { PropertiesInquiry } from "../../types/property/property.input";

interface TopCategoryBooks {
    initialInput: PropertiesInquiry;
};

const TopCategories = (props: TopCategoryBooks) => {
    const { initialInput } = props;
    const device = useDeviceDetect();

    const [topCategoryBooks, setTopCategoryBooks] = useState<Property[]>([]);
    const [searchFilter, setSearchFilter] = useState<PropertiesInquiry>(initialInput);

    /* Apollo request */

    const {
        loading: getPropertiesLoading,
        data: getPropertiesData,
        error: getPropertiesError,
        refetch: getPropertiesRefetch,		
    } = useQuery(GET_PROPERTIES, {
        fetchPolicy: "cache-and-network",
        variables: {input: searchFilter},
        notifyOnNetworkStatusChange: true,
        onCompleted: (data: T) => {
            setTopCategoryBooks(data?.getProperties?.list);
        }
    });

    /* HANDLERS */
    const changePropertyInqueryHandler = useCallback(
    (e: any) => {
      const category = e.currentTarget.value;
      if (!category) return;

      setSearchFilter((prev: any) => {
        const next = {
          ...prev,
          page: 1, // reset page when filters change
          search: {
            ...(prev.search ?? {}),
            propertyCategory: [category],
          },
        };
        console.log("Updated searchFilter:", next);
        return next;
      });
    },
    []
  );
    
    if(device === 'mobile') {
        return(
            <Stack className={'top-categories'}>
                <Stack className={'container'}>
                    <Stack className={'info-box'}>
                        Top Categories
                    </Stack>
                    <Stack>
                        Cards
                    </Stack>
                </Stack>
            </Stack>
        );
    } else {
        return(
            <Stack className={'top-categories'}>
                <Stack className={'container'}>
                    <Stack className={"info-box"}>
                        Top Categories
                    </Stack>
                    <Stack className={'filter-box'}>
                        <Button 
                            className={'filter-item'} value={'ROMANCE'}
                            onClick={changePropertyInqueryHandler}
                        >
                            <img src="/img/categoris/catigori-1-1.png" alt="" />
                            <Box className={'item-title'}>Romance</Box>
                        </Button>
                        <Button 
                            className={'filter-item'} value={'BUSINESS'}
                            onClick={changePropertyInqueryHandler}
                        >
                            <img src="/img/categoris/catigori-1-2.png" alt="" />
                            <Box className={'item-title'}>Business</Box>
                        </Button>
                        <Button 
                            className={'filter-item'} value={'FICTION'}
                            onClick={changePropertyInqueryHandler}
                        >
                            <img src="/img/categoris/catigori-1-3.png" alt="" />
                            <Box className={'item-title'}>Fiction</Box>
                        </Button>
                        <Button 
                            className={'filter-item'} value={'SCIENCE'}
                            onClick={changePropertyInqueryHandler}
                        >
                            <img src="/img/categoris/catigori-1-4.png" alt="" />
                            <Box className={'item-title'}>Science</Box>
                        </Button>
                        <Button 
                            className={'filter-item'} value={'TECHNOLOGY'}
                            onClick={changePropertyInqueryHandler}
                        >
                            <img src="/img/categoris/catigori-1-5.png" alt="" />
                            <Box className={'item-title'}>Technology</Box>
                        </Button>
                        <Button 
                            className={'filter-item'} value={'NATURE'}
                            onClick={changePropertyInqueryHandler}
                        >
                            <img src="/img/categoris/catigori-1-6.png" alt="" />
                            <Box className={'item-title'}>Nature</Box>
                        </Button>
                    </Stack>
                    <Stack className={'properties'}>
                        {topCategoryBooks.map((property: Property) => {
                            return (
                                <TopCategoryPropertyCard key={property?._id} property={property} />
                            );
                        })}
                    </Stack>
                    <Button className={'main-button'} variant={'outlined'} href={'/books'}>View More</Button>
                </Stack>
            </Stack>
        );
    }
}

TopCategories.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default TopCategories;