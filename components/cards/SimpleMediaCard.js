import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import AlbumIcon from "../../public/icons/album.svg";
import ArticleIcon from "../../public/icons/article.svg";
import LinkIcon from "../../public/icons/external-link.svg";
import FileIcon from "../../public/icons/file.svg";
import TutorialIcon from "../../public/icons/tutorial.svg";
import EditIcon from "../../public/icons/edit.svg";
import DeleteIcon from "../../public/icons/delete.svg";
import Button from "../Button";
import Date from "../Date";
import Icon from "../Icon";
import Card from "./Card";
import { deleteLibraryMedia } from "../../services/community";
import useModal from "../../utils/useModal";
import Modal from "../Modal";
import { hasError } from "../../utils/fetchTools";
import { useSnackBars } from "../../providers/SnackBarProvider";
import { useRouter } from "next/router";

const Container = styled(Card)`
  && {
    height: unset;

    padding: 1rem 1.25rem;
    margin: 0 0 1.5rem 0;

    background-color: ${(props) => props.theme.dark};
  }

  align-items: center;
`;

const IconHolder = styled(Icon)`
  && {
    padding: 0.5rem;
    margin: 0 0.5rem 0 0;

    cursor: default;
  }

  background-color: ${(props) => props.theme.primary};
  border-radius: ${(props) => props.theme.radiusMin};
`;

const InfoHolder = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const MediaTitle = styled.b`
  max-height: 20px;

  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 18px;
  line-height: 20px;
  white-space: nowrap;
`;

const MediaDate = styled(Date)`
  font-size: 14px;
  margin-bottom: 0.5rem;
`;

const ButtonRow = styled.div`
  display: flex;

  align-items: center;
  justify-content: flex-end;
`;

export default function SimpleMediaCard({ media, showTools }) {
  const { show, toggle } = useModal();
  const { addAlert } = useSnackBars();
  const router = useRouter();

  async function deleteMedia() {
    const res = await deleteLibraryMedia(media.id);
    console.log(res);

    if (!hasError(res)) {
      addAlert("success", "The media was deleted successfully.");
    } else {
      addAlert("error", "Their was an error deleting the media.");
    }
  }

  return (
    <>
      <Modal show={show} handleClose={toggle} title={`Delete Media`}>
        <p>
          Are you sure you want to delete the media named : "
          <b>{media.title}</b>" ? This action is irreversible.
        </p>
        <ButtonRow>
          <Button
            inverted
            color={"error"}
            label={"No"}
            onClick={() => toggle()}
          />
          <Button
            color={"primary"}
            label={"Yes"}
            onClick={() => {
              deleteMedia();
              toggle();
            }}
          />
        </ButtonRow>
      </Modal>

      <Container>
        <IconHolder color="dark" size={32}>
          {media.type === "album" && <AlbumIcon />}
          {media.type === "article" && <ArticleIcon />}
          {media.type === "links" && <LinkIcon />}
          {media.type === "files" && <FileIcon />}
          {media.type === "tutorial" && <TutorialIcon />}
        </IconHolder>
        <InfoHolder>
          <MediaDate dateString={media.created_at} />
          <MediaTitle>{media.title}</MediaTitle>
        </InfoHolder>
        <ButtonRow>
          <Link
            href={"/library/medias/[slug]"}
            as={`/library/medias/${media.slug}`}
          >
            <Button color={"primary"} label={"View"} />
          </Link>
          {showTools && (
            <>
              <Button
                inverted
                color={"secondary"}
                icon={<EditIcon />}
                onClick={() =>
                  router.push({
                    pathname: "/library/create-media",
                    query: { id: media.id },
                  })
                }
              />
              <Button
                inverted
                color={"error"}
                icon={<DeleteIcon />}
                onClick={() => toggle()}
              />
            </>
          )}
        </ButtonRow>
      </Container>
    </>
  );
}

SimpleMediaCard.propTypes = {
  /**
   * Object containing the media information
   */
  media: PropTypes.object.isRequired,
  /**
   * Whether or not to show the edition tools
   */
  showTools: PropTypes.bool,
};

SimpleMediaCard.defaultProps = {
  showTools: false,
};
